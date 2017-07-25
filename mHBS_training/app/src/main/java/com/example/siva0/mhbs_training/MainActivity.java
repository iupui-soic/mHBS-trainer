/*
* Main Activity is the home page for this application.
 */

package com.example.siva0.mhbs_training;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.activities.DownloadsActivity;
import com.example.siva0.mhbs_training.activities.FavoritesActivity;
import com.example.siva0.mhbs_training.activities.ProgramPortalActivity;
import com.example.siva0.mhbs_training.activities.SearchActivity;
import com.example.siva0.mhbs_training.activities.SettingsActivity;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, CompoundButton.OnCheckedChangeListener {
    Button btn_Videos, btn_Resources, btn_Courses;
        Switch sw_offlineMode;
        TextView tv_switch_status;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // TODO: handle user credentials and database from login

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

        tv_switch_status = (TextView) findViewById(R.id.tv_switcher_status);
        sw_offlineMode = (Switch) findViewById(R.id.sw_offlineMode);
     //   sw_offlineMode.setOnCheckedChangeListener(this);

    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
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
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_favorites) {
            Intent intent = new Intent(this, FavoritesActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_download) {
            Intent intent = new Intent(this, DownloadsActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_information) {
            Intent intent = new Intent(this, SearchActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_settings) {
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_mHBS_tracker_app) {
            shortToastMessage("Start mHBS Tracker App");
            // TODO - Start mHBS app from here
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void shortToastMessage(String s)
    {
        Toast.makeText(getApplicationContext(), s, Toast.LENGTH_SHORT).show();
    }

    public void startVideos(View view) {
       callProgramPortal(view.getTag().toString());
    }

    public void startResources(View view) {
        callProgramPortal(view.getTag().toString());
    }

    public void startCourses(View view) {
        callProgramPortal(view.getTag().toString());
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            //tv_switch_status.setText("On");
            // TODO - Add methods for online mode
        } else {
            //tv_switch_status.setText("Off");
            // TODO - Add methods for offline mode
        }
    }

    // when each button is clicked, we call the program portal activity and display program options per resource chosen
    public void callProgramPortal(String resourceType){
        Intent intent = new Intent(this, ProgramPortalActivity.class);
        intent.putExtra("resourceKey",resourceType);
        startActivity(intent);
    }
}
