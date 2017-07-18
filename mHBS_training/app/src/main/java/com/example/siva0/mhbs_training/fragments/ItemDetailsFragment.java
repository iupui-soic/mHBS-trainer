/*
* This fragment displays details about individual videos, resources etc..
*/

package com.example.siva0.mhbs_training.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.siva0.mhbs_training.R;

public class ItemDetailsFragment extends Fragment {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {

        // Inflate the xml file for the fragment
        return inflater.inflate(R.layout.fragment_item_details, parent, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        // Set values for view here

    }

}