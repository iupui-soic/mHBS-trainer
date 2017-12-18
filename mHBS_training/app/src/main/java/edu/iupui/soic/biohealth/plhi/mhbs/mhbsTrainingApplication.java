
package edu.iupui.soic.biohealth.plhi.mhbs;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.hisp.dhis.android.sdk.controllers.PeriodicSynchronizerController;
import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.network.Session;
import org.hisp.dhis.android.sdk.persistence.Dhis2Application;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;
import org.hisp.dhis.android.sdk.persistence.preferences.AppPreferences;
import org.hisp.dhis.android.sdk.persistence.preferences.LastUpdatedManager;
import org.hisp.dhis.android.sdk.ui.activities.LoginActivity;

import java.io.FileInputStream;
import java.security.KeyStore;

public class mhbsTrainingApplication extends Dhis2Application {

    @Override
    public void onCreate() {
        super.onCreate();

        /*TODO: Here we can send a broadcast to tracker capture. If the user is logged in,        *
        * Consider adding a prompt to confirm the user is logged in for
        * the case a user is logged in tracker capture while a separate user
        * wants to user our app
        *
        * Consider adding logout functionality
         */
        final Fabric fabric = new Fabric.Builder(this)
                .kits(new Crashlytics())
                .debuggable(true)
                .build();
        Fabric.with(fabric);


        UserAccount userAccount = MetaDataController.getUserAccount();
        if(userAccount!=null) {
            Class<?> mainActivity = getMainActivity();
            Intent i = new Intent(getApplicationContext(), mainActivity);
            Log.d("Test", "in mhbs Training Application");
            startActivity(i);
        }

    }

    @Override
    public Class<? extends AppCompatActivity> getMainActivity() {
        return new MainActivity().getClass();
    }
}