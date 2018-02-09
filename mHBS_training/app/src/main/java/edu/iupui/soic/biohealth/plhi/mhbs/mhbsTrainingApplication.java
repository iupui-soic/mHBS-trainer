
package edu.iupui.soic.biohealth.plhi.mhbs;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import org.hisp.dhis.android.sdk.controllers.DhisController;
import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.persistence.Dhis2Application;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;

public class mhbsTrainingApplication extends Dhis2Application {
    static final boolean isLogged = true;

    @Override
    public void onCreate() {

        /*TODO: Here we can send a broadcast to tracker capture. If the user is logged in,
        * Create an instance of LoginActivity and call handleUser();
        *
        * Consider adding a prompt to confirm the user is logged in for
        * the case a user is logged in tracker capture while a separate user
        * wants to user our app
        *
        * Consider adding logout functionality
         */
        super.onCreate();
        final Fabric fabric = new Fabric.Builder(this)
                .kits(new Crashlytics())
                .debuggable(true)
                .build();
        Fabric.with(fabric);


        // if we are logged in, just log in
        UserAccount userAccount = MetaDataController.getUserAccount();
        if(userAccount!=null) {
            Class<?> mainActivity = getMainActivity();
            Intent i = new Intent(getApplicationContext(), mainActivity);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(i);
        }else if(isTrackerInstalled(getString(R.string.trackerCapture))){
            // broadcast to tracker to receive login information
            Intent intent = new Intent();
            intent.setAction("edu.iupui.soic.biohealth.plhi.mhbs.activities.SharedLoginActivity");
            sendBroadcast(intent);
        }
    }

    @Override
    public Class<? extends AppCompatActivity> getMainActivity() {
        return new MainActivity().getClass();
    }

    public boolean isTrackerInstalled(String checkForPackage){
        PackageManager pm = this.getPackageManager();
        boolean installed;
        try{
            pm.getPackageInfo(checkForPackage,PackageManager.GET_ACTIVITIES);
            installed = true;
        }catch(PackageManager.NameNotFoundException e){
            installed = false;
        }
        return installed;
    }
}