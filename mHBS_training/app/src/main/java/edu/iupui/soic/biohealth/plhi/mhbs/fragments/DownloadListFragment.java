package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.ClipData;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;

import org.hisp.dhis.android.sdk.network.Credentials;

import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.activities.ResourcesActivity;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloaderUtil;


public class DownloadListFragment extends Fragment implements DocumentResources.AsyncResponse{
    private OnFragmentInteractionListener mListener;
    Snackbar mySnackbar;
    ProgressBar myProgressBar;

    public DownloadListFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ResourceItemDownloaderUtil rd = new ResourceItemDownloaderUtil();
        rd.resourceFinder(this.getContext());

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_download_list, container, false);

        if(getDownloadMetaData(rootView)){
            Log.d("Test", "we had data");
        }else{
            Log.d("Test", "we did not have data");
        }
        ListView listview =(ListView)rootView .findViewById(R.id.downloadListView);

        ArrayAdapter<String> adapter =
                new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, ResourceItemDownloaderUtil.allDownloads);
        listview.setAdapter(adapter);
        return rootView;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(boolean status) {
        if (mListener != null) {
            mListener.onFragmentInteraction(status);
        }
    }

    private boolean getDownloadMetaData(View view){
        DocumentResources documentResources = new DocumentResources();
        if (documentResources.getResourcesLength()>0){
            return true;
        }else{
            mListener.onFragmentInteraction(false);
            //executing any resource will synchronize resourcesFound array we need
            new DocumentResources(this).execute("Resources");
            mySnackbar = Snackbar.make(view, "Synchronizing data", Snackbar.LENGTH_INDEFINITE);
            mySnackbar.show();
        }
        return false;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void processFinish(List<DocumentResources.ResourceItem> output) {
        mySnackbar.dismiss();
        mListener.onFragmentInteraction(true);
    }

    @Override
    public Credentials getCredentials() {
        return null;
    }

    public interface OnFragmentInteractionListener {
        void onFragmentInteraction(boolean status);
    }
}
