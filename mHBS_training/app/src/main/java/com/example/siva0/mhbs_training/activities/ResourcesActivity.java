/*
* Resources Activity calls a list fragment which brings up the available resources (PDF or image) in a list fragment
*/

package com.example.siva0.mhbs_training.activities;

import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;
import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.dummy.DummyContent;
import com.example.siva0.mhbs_training.fragments.ItemDetailsFragment;
import com.example.siva0.mhbs_training.fragments.ItemFragment;
import com.github.barteksc.pdfviewer.PDFView;

public class ResourcesActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener{
    FragmentManager fragmentManager = getSupportFragmentManager();

// Create static context of pdf from plugin
    static PDFView pdfView;

// Creates a local instance of download
    String pdfName = "pdf.pdf";



//    TODO:// Check url link against database
/*
   Views PDF from online
    String pdfStreamLink = "http://www.pdf995.com/samples/pdf.pdf";
    Uri pdfStream = Uri.parse(pdfStreamLink);
*/


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resource);

        // TODO: remove after testing
        Toast.makeText(getApplicationContext(), getIntent().getStringExtra("resourceKey"), Toast.LENGTH_SHORT).show();

        // set the action bar to implement going back
        ActionBar myToolbar = this.getSupportActionBar();
        if (myToolbar != null) {
            myToolbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_SHOW_TITLE);
            myToolbar.setDisplayHomeAsUpEnabled(true);
        }

        if (savedInstanceState == null) {
            // call the list fragment via fragment manager
            ItemFragment itemFragment = new ItemFragment();
            fragmentManager
                    .beginTransaction()
                    .replace(R.id.res_fragment_container, itemFragment)
                    .commit();
        }
    }

    @Override
    public void onListFragmentInteraction(DummyContent.DummyItem item) {
        ItemDetailsFragment detailsFragment = new ItemDetailsFragment();

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        detailsFragment.setArguments(args);

        // when we interact with an item, begin a new details fragment
        // TODO: will need to pass item data to the new fragment
        fragmentManager
                .beginTransaction()
                .replace(R.id.res_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();

//        fixme: UNCOMMENT FOR DOWNLOADS__pdfView running through downloads not working properly
/*       String pdfPlace = "android.resource://" + getPackageName() + "/raw/" + pdfName;
        Log.d("hi", pdfPlace);*//*

        pdfView.fromAsset(pdfName)
                .defaultPage(1)
                .enableSwipe(true)
                 .load();*/

//        fixme: UNCOMMENT FOR STREAM__pdfView from uri not passing correctly

/*
        pdfView.fromUri(pdfStream)
               .defaultPage(1)
               .enableSwipe(true)
               .onLoad(onLoadCompleteListener)
                .onPageChange(this)
                .load();
*/
    }

    // for returning via the menu back button rather than button click
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                // pop off fragments if we can
                if (fragmentManager.getBackStackEntryCount() > 1) {
                    fragmentManager.popBackStack();
                    return true;
                }
                super.onBackPressed();

            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
