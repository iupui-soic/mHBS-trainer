/*
* Main Activity is the home page for this application.
 */

package edu.iupui.soic.biohealth.plhi.mhbs;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ProgressBar;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;

import edu.iupui.soic.biohealth.plhi.mhbs.activities.ResourcesActivity;
import edu.iupui.soic.biohealth.plhi.mhbs.activities.SearchActivity;
import edu.iupui.soic.biohealth.plhi.mhbs.activities.SettingsActivity;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.DownloadListFragment;
import edu.iupui.soic.biohealth.plhi.mhbs.fragments.VideoDetailsFragment;


public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, CompoundButton.OnCheckedChangeListener, DownloadListFragment.OnFragmentInteractionListener {
    Button btn_Videos, btn_Resources, btn_Courses;
    Switch sw_offlineMode;
    TextView tv_switch_status, dhis_user_name, dhis_user_email;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btn_Courses = (Button) findViewById(R.id.btn_courses);
        btn_Resources = (Button) findViewById(R.id.btn_resources);
        btn_Videos = (Button) findViewById(R.id.btn_videos);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        // to set text to drawer we need to get its view to access its content
        View header = navigationView.getHeaderView(0);
        tv_switch_status = (TextView) header.findViewById(R.id.tv_switcher_status);
        sw_offlineMode = (Switch) header.findViewById(R.id.sw_offlineMode);

        // get the user details from login
        UserAccount userAccount = MetaDataController.getUserAccount();

        if(userAccount!=null){
            // Change the user id and email to match login details
            dhis_user_name = (TextView) header.findViewById(R.id.dhis_user_name);
            dhis_user_email = (TextView) header.findViewById(R.id.dhis_user_email);
            // display the username and email in the navigation drawer
            dhis_user_name.setText(userAccount.getDisplayName());
            dhis_user_email.setText(userAccount.getEmail());
        }
        sw_offlineMode.setOnCheckedChangeListener(this);

/*TODO: The following code is an example of connecting and printing data from the database
        // the same logic needs to be implemented for pdf/videos. See documentation on github
         // issue #41 under the database section for great detail.
        Dhis2Application.bus.register(this);
        // can we load data?
        boolean canLoad = MetaDataController.isDataLoaded(this);

        if(canLoad){
            Log.d("canLoad", "Yes we can load data from the database");
        }else{
            Log.d("canLoad", "No we cannot load data");
        }
        // log the data
        List<RelationshipType> rt = MetaDataController.getRelationshipTypes();
        if(rt.isEmpty()){
            Log.d("isEmpty", "Relationship types is empty");
        }
        else{
            Log.d("isEmpty",rt.get(0).getName());
        }*/
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        }
        else if (getFragmentManager().getBackStackEntryCount() > 0) {
            getFragmentManager().popBackStack();
        }
        else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(final Menu menu) {
        Log.d("Test", "oncreate");
        MenuInflater inflater = getMenuInflater();
        // Inflate the menu; this adds items to the action bar if it is present.
        inflater.inflate(R.menu.main, menu);
        // Retrieve the SearchView and plug it into SearchManager
        // Detect SearchView icon clicks

        final MenuItem searchItem = menu.findItem(R.id.menuSearch);
        SearchView searchView = (android.support.v7.widget.SearchView) searchItem.getActionView();

        searchView.setOnSearchClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setItemsVisibility(menu, searchItem, false);
            }


        });

        searchView.setOnCloseListener(new SearchView.OnCloseListener() {
            @Override
            public boolean onClose() {
                setItemsVisibility(menu, searchItem, true);
                return false;
            }
        });


        return super.onCreateOptionsMenu(menu);
    }

    private void setItemsVisibility(Menu menu, MenuItem exception, boolean visible) {
        for (int i = 0; i < menu.size(); ++i) {
            MenuItem item = menu.getItem(i);
            if (item != exception) item.setVisible(visible);
        }

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Log.d("Test", "onopitemselect");

        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        //if (id == R.id.action_settings) {
        //    return true;
        //}

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Log.d("Test", "onNavItemSel");

        // Handle navigation view item clicks here.
        int id = item.getItemId();
        if (id == R.id.nav_download) {
            getSupportFragmentManager().beginTransaction().add(R.id.main_fragment_container,new DownloadListFragment()).addToBackStack(null).commit();
        } else if (id == R.id.nav_information) {
            Intent intent = new Intent(this, SearchActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_settings) {
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_mHBS_tracker_app) {
            /*Start the DHIS2 capture tracker app with intent*/
            String trackerCapture = getString(R.string.trackerCapture);
            Intent launchIntent = getPackageManager().getLaunchIntentForPackage(trackerCapture);
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(launchIntent);
            } else {
                // tracker capture not on phone
                // TODO: hide button in side bar instead of this prompt if tracker not installed
                shortToastMessage(getString(R.string.trackerCaptureNA));
            }
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void shortToastMessage(String s) {
        Toast.makeText(getApplicationContext(), s, Toast.LENGTH_SHORT).show();
    }

    public void startVideos(View view) {
        callProgramPortal(view.getTag().toString());}

    public void startResources(View view) {
        callProgramPortal(view.getTag().toString());
    }

    public void startCourses(View view) {
        callProgramPortal(view.getTag().toString());
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            tv_switch_status.setText(R.string.toggleOn);
            // TODO - Add methods for online mode
        } else {
            tv_switch_status.setText(R.string.toggleOff);
            // TODO - Add methods for offline mode
        }
    }

    // when each button is clicked, we call the program portal activity and display program options per resource chosen
    public void callProgramPortal(String resourceType) {
        Intent intent = new Intent(this, ResourcesActivity.class);
        intent.putExtra(getString(R.string.resourceKey), resourceType);
        startActivity(intent);
    }

    @Override
    public void onResume(){
        super.onResume();
    }

    @Override
    public void onDownloadStatus(boolean status) {
        ProgressBar progressBar = (ProgressBar) findViewById(R.id.downloadListProgressBar);
        if (!status) {
            progressBar.setVisibility(View.VISIBLE);
        } else {
            progressBar.setVisibility(View.INVISIBLE);
        }
    }

    @Override
    public void onFragmentInteraction(String id, String file) {
        VideoDetailsFragment videoFragment = new VideoDetailsFragment();
        Bundle b = new Bundle();
        b.putString("resourceDir", file);
        b.putString("itemToDownload", id);
        videoFragment.setArguments(b);
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.container_fragment_frame,new VideoDetailsFragment())
                .addToBackStack(null)
                .commit();
    }

    /*
    @Override
    public void onPostResume(){
        Log.d("Test", "resuming");
        super.onPostResume();
        this.onPostResume();
    }
    */

}
