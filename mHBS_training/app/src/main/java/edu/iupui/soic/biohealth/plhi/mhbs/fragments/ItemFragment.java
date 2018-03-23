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
import android.widget.ProgressBar;

import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.ContentViewEvent;

import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.network.Credentials;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.adapters.MyItemRecyclerViewAdapter;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources.ResourceItem;

public class ItemFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    private OnListFragmentInteractionListener mListener;
    private MyItemRecyclerViewAdapter mAdapter;
    private List<DocumentResources.ResourceItem> output;
    private UserAccount userAccount = MetaDataController.getUserAccount();

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

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            int mColumnCount = 1;
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
        //fabric
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        Answers.getInstance().logContentView(new ContentViewEvent()
                .putContentName("itemView"+","+userAccount.getUId())
                .putCustomAttribute("itemView start time",userAccount.getUId()+","+sdf.format(date)));
    }

    @Override
    public void onDetach() {
        super.onDetach();

        mListener = null;
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        Answers.getInstance().logContentView(new ContentViewEvent()
                .putContentName("itemView"+","+userAccount.getUId())
                .putCustomAttribute("items end time",userAccount.getUId()+","+sdf.format(date)));
    }


    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(ResourceItem item);
        void onFragmentComplete();
        void onDownloadButtonClick(ResourceItem item, boolean status);
    }

    public void setOutput(List<DocumentResources.ResourceItem> output){
        this.output = output;
    }

}
