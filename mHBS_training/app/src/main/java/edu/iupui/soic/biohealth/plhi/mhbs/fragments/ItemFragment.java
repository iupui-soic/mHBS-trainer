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

public class ItemFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    private MyItemRecyclerViewAdapter mAdapter;
    private ProgressBar progressBar;
    private List<DocumentResources.ResourceItem> output;
    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */

    public ItemFragment(){

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(output!=null) {
            mAdapter = new MyItemRecyclerViewAdapter(mListener);
            mAdapter.addItems(output);
            mAdapter.notifyDataSetChanged();
            mListener.onFragmentComplete();
        }
    }

    @Override
    public void onPause(){
        super.onPause();
    }

    @Override
    public void onResume(){
        super.onResume();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_item_list, container, false);

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
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


    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(ResourceItem item);
        void onFragmentComplete();
    }

    public void setOutput(List<DocumentResources.ResourceItem> output){
        this.output = output;
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
