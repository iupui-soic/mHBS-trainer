
package edu.iupui.soic.biohealth.plhi.mhbs;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import org.hisp.dhis.android.sdk.persistence.Dhis2Application;

public class mhbsTrainingApplication extends Dhis2Application {

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
    }

    @Override
    public Class<? extends AppCompatActivity> getMainActivity() {
        return new MainActivity().getClass();
    }
}