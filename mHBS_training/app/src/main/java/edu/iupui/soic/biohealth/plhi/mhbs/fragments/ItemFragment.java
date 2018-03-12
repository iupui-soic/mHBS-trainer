/*
* A fragment representing a list of Items to be reused wherever lists of resources are needed
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import org.hisp.dhis.android.sdk.network.Credentials;

import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.adapters.MyItemRecyclerViewAdapter;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources.ResourceItem;

public class ItemFragment extends Fragment implements DocumentResources.AsyncResponse {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    private MyItemRecyclerViewAdapter mAdapter;
    private ProgressBar progressBar;
    private boolean progFlag = true;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public ItemFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static ItemFragment newInstance(int columnCount) {
        ItemFragment fragment = new ItemFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
            String activity = getArguments().getString("resourceKey");
            new DocumentResources(this).execute(activity);

        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_item_list, container, false);

        if (progFlag) {
            progressBar = (ProgressBar) getActivity().findViewById(R.id.iBar);
            progressBar.setVisibility(View.VISIBLE);
        }

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            mAdapter = new MyItemRecyclerViewAdapter(mListener);
            recyclerView.setAdapter(mAdapter);
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void processFinish(List<ResourceItem> output) {
        // TODO: this only should happen once per pdf/video
        mAdapter.addItems(output);
        mAdapter.notifyDataSetChanged();
        progressBar.setVisibility(View.GONE);
        progFlag = false;
    }

    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(ResourceItem item);
    }


public Credentials getCredentials(){
        String username = "";
        String password = "";
        SharedPreferences sharedPref = getContext().getSharedPreferences("credentials", 0);
        username = sharedPref.getString("username", "NULL");
        password = sharedPref.getString("password", "NULL");
        Credentials credentials = new Credentials(username,password);
    return credentials;
    }
}
