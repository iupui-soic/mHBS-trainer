
package edu.iupui.soic.bhi.plhi.mhbs.training.activities;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.squareup.okhttp.HttpUrl;
import com.squareup.otto.Subscribe;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.hisp.dhis.android.sdk.controllers.DhisService;
import org.hisp.dhis.android.sdk.controllers.LoadingController;
import org.hisp.dhis.android.sdk.events.UiEvent;
import org.hisp.dhis.android.sdk.job.NetworkJob;
import org.hisp.dhis.android.sdk.network.APIException;
import org.hisp.dhis.android.sdk.network.Credentials;
import org.hisp.dhis.android.sdk.persistence.Dhis2Application;
import org.hisp.dhis.android.sdk.persistence.preferences.AppPreferences;
import org.hisp.dhis.android.sdk.persistence.preferences.ResourceType;
import org.hisp.dhis.android.sdk.utils.UiUtils;

import java.util.ArrayList;

public class SharedLoginActivity extends Activity implements View.OnClickListener {
    /**
     *
     */
    private final static String CLASS_TAG = "LoginActivity";
    public static final String KEY_SAVED_SERVER_URL = "KEY:SERVER_URL";

    private EditText usernameEditText;
    private EditText passwordEditText;
    private EditText serverEditText;
    private Button loginButton;
    private ProgressBar progressBar;
    private View viewsContainer;
    private Bundle extras;
    private boolean trackerFlag;
    private AppPreferences mPrefs;
    private static final String requestKey = "key:loginRequest";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(org.hisp.dhis.android.sdk.R.layout.activity_login);

        // these are required for both normal logging as well as logging in from tracker
        if (DhisController.isUserLoggedIn()) {
            launchMainActivity();
            finish();
        }
        // required UI elements
        setUpCommonUi();

        // If there are extras, they are existing user credentials from tracker-capture
        extras = getIntent().getExtras();

        // if we have credentials, we can bypass the normal login
        if (extras != null) {
            trackerFlag = true;
            loginFromTracker();
        }

        // using sentinel bool flag, if false, we can't log in from tracker -> login as normal
        if (!trackerFlag) {
            // otherwise, login as normal
            setupUI();
        }
    }

    public void loginFromTracker() {
        if (extras != null) {
            ArrayList<String> creds;
            creds = extras.getStringArrayList(requestKey);
          
            if (creds != null) {
                if (usernameEditText != null && passwordEditText != null && serverEditText != null) {
                    usernameEditText.setText(creds.get(0));
                    passwordEditText.setText(creds.get(1));
                    serverEditText.setText(creds.get(2));
                } else {
                    // something went wrong so we will just login as normally
                    trackerFlag = false;
                }
                // simulate a login click for the user
                loginButton.performClick();
            }
        }
    }

    // elements needed for login from tracker and normal login
    public void setUpCommonUi() {
        trackerFlag = false;
        mPrefs = new AppPreferences(getApplicationContext());
        loginButton = (Button) findViewById(org.hisp.dhis.android.sdk.R.id.login_button);
        progressBar = (ProgressBar) findViewById(org.hisp.dhis.android.sdk.R.id.progress_bar);
        usernameEditText = (EditText) findViewById(org.hisp.dhis.android.sdk.R.id.username);
        passwordEditText = (EditText) findViewById(org.hisp.dhis.android.sdk.R.id.password);
        serverEditText = (EditText) findViewById(org.hisp.dhis.android.sdk.R.id.server_url);
        loginButton.setOnClickListener(this);
    }


    @Override
    public void onPause() {
        super.onPause();
        Dhis2Application.bus.unregister(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        Dhis2Application.bus.register(this);
    }

    /**
     * Sets up the initial UI elements
     */
    private void setupUI() {
        viewsContainer = findViewById(org.hisp.dhis.android.sdk.R.id.login_views_container);

        String server = null;//mPrefs.getServerUrl();
        String username = null;//mPrefs.getUsername();
        String password = null;

        DhisController.getInstance().init();
        if (DhisController.isUserLoggedIn()) {
            server = DhisController.getInstance().getSession().getServerUrl().toString();
            username = DhisController.getInstance().getSession().getCredentials().getUsername();
            password = DhisController.getInstance().getSession().getCredentials().getPassword();
        }

        if (server == null) {
            server = mPrefs.getServerUrl();
            if (server == null) {
                server = "https://";
            }
        }

        if (username == null) {
            username = "";
            password = "";
        }

        serverEditText.setText(server);
        usernameEditText.setText(username);
        passwordEditText.setText(password);

        progressBar.setVisibility(View.GONE);
    }

    @Override
    public void onClick(View v) {
        String username = usernameEditText.getText().toString();
        String password = passwordEditText.getText().toString();
        String serverURL = serverEditText.getText().toString();

        if (username.isEmpty()) {
            showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.enter_username));
            return;
        }

        if (password.isEmpty()) {
            showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.enter_password));
            return;
        }

        if (serverURL.isEmpty()) {
            showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.enter_serverurl));
            return;
        }

        //remove whitespace as last character for username
        if (username.charAt(username.length() - 1) == ' ') {
            username = username.substring(0, username.length() - 1);
        }

        mPrefs.putServerUrl(serverURL);
        // set shared preferences for use in http auth for web api
        sendToSharedPref(username,password);
        login(serverURL, username, password);
    }

    public void login(String serverUrl, String username, String password) {
        if (!trackerFlag) {
            showProgress();
        }
      
        HttpUrl serverUri = HttpUrl.parse(serverUrl);
        if (serverUri == null) {
            showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.invalid_server_url));
            return;
        }
      
        DhisService.logInUser(serverUri, new Credentials(username, password));
    }

    @Subscribe
    public void onReceivedUiEvent(UiEvent uiEvent) {
        if (trackerFlag) {
            launchMainActivity();
            finish();
        }
      
        if (uiEvent.getEventType().equals(UiEvent.UiEventType.SYNCING_END)) {
            launchMainActivity();
        }
    }

    @Subscribe
    public void onLoginFinished(NetworkJob.NetworkJobResult<ResourceType> result) {
        if (result != null && ResourceType.USERS.equals(result.getResourceType())) {
            if (result.getResponseHolder().getApiException() == null) {
                hideKeyboard();

                LoadingController.enableLoading(this, ResourceType.ASSIGNEDPROGRAMS);
                LoadingController.enableLoading(this, ResourceType.OPTIONSETS);
                LoadingController.enableLoading(this, ResourceType.PROGRAMS);
                LoadingController.enableLoading(this, ResourceType.CONSTANTS);
                LoadingController.enableLoading(this, ResourceType.PROGRAMRULES);
                LoadingController.enableLoading(this, ResourceType.PROGRAMRULEVARIABLES);
                LoadingController.enableLoading(this, ResourceType.PROGRAMRULEACTIONS);
                LoadingController.enableLoading(this, ResourceType.RELATIONSHIPTYPES);
                DhisService.loadInitialData(edu.iupui.soic.bhi.plhi.mhbs.training.activities.SharedLoginActivity.this);
            } else {
                onLoginFail(result.getResponseHolder().getApiException());
            }
        }
    }

    private void hideKeyboard() {
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(passwordEditText.getWindowToken(), 0);
    }

    private void showProgress() {
        Animation anim = AnimationUtils.loadAnimation(this, org.hisp.dhis.android.sdk.R.anim.out_up);
        viewsContainer.startAnimation(anim);
        viewsContainer.setVisibility(View.GONE);
        progressBar.setVisibility(View.VISIBLE);
    }

    private void showLoginFailedDialog(String error) {
        Dialog.OnClickListener listener = new Dialog.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                showLoginDialog();
            }
        };
        UiUtils.showErrorDialog(this, getString(org.hisp.dhis.android.sdk.R.string.error_message), error, listener);
    }

    public void onLoginFail(APIException e) {
        if (e.getResponse() == null) {
            String type = "error";
            //if (e.isHttpError()) type = "HttpError";
            //else if (e.isUnknownError()) type = "UnknownError";
            //else if (e.isNetworkError()) type = "NetworkError";
            //else if (e.isConversionError()) type = "ConversionError";
            showLoginFailedDialog(type + ": "
                    + e.getMessage());
        } else {
            if (e.getResponse().getStatus() == 401) {
                showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.invalid_username_or_password));
            } else {
                showLoginFailedDialog(getString(org.hisp.dhis.android.sdk.R.string.unable_to_login) + " " + e.getMessage());
            }
        }
    }

    private void showLoginDialog() {
        Animation anim = AnimationUtils.loadAnimation(this, org.hisp.dhis.android.sdk.R.anim.in_down);
        progressBar.setVisibility(View.GONE);
        viewsContainer.setVisibility(View.VISIBLE);
        viewsContainer.startAnimation(anim);
    }

    private void handleUser() {
        mPrefs.putServerUrl(serverEditText.getText().toString());
        mPrefs.putUserName(usernameEditText.getText().toString());
        launchMainActivity();
    }

    public void launchMainActivity() {
        startActivity(new Intent(edu.iupui.soic.bhi.plhi.mhbs.training.activities.SharedLoginActivity.this,
                ((Dhis2Application) getApplication()).getMainActivity()));
        finish();
    }

    @Override
    public void onBackPressed() {
        finish();
        System.exit(0);
        super.onBackPressed();
    }

    // send to shared preferences for use in other places in our app
    private void sendToSharedPref(String username, String password){
        SharedPreferences sharedPref = getApplicationContext().getSharedPreferences("credentials",0);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("username", username);
        editor.putString("password", password);
        editor.commit();
    }
}
