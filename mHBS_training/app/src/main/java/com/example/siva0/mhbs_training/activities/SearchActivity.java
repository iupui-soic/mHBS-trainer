/*
* The search activity containing search results in a list
*/

package com.example.siva0.mhbs_training.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.example.siva0.mhbs_training.R;
import com.example.siva0.mhbs_training.dummy.DummyContent;
import com.example.siva0.mhbs_training.fragments.ItemDetailsFragment;
import com.example.siva0.mhbs_training.fragments.ItemFragment;

public class SearchActivity extends AppCompatActivity implements ItemFragment.OnListFragmentInteractionListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
    }

    @Override
    public void onListFragmentInteraction(DummyContent.DummyItem item) {
        ItemDetailsFragment detailsFragment = new ItemDetailsFragment();

        Bundle args = new Bundle();
        // Communicate with Fragment using Bundle
        detailsFragment.setArguments(args);

        // when we interact with an item, begin a new details fragment
        // TODO: will need to pass item data to the new fragment
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.res_fragment_container, detailsFragment)
                .addToBackStack(null)
                .commit();
    }

}
