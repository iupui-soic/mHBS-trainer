package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.hisp.dhis.android.sdk.network.Credentials;

import java.util.ArrayList;
import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloaderUtil;


public class DownloadListFragment extends Fragment implements DocumentResources.AsyncResponse{
    private OnFragmentInteractionListener mListener;
    Snackbar mySnackbar;
    private List<String> downloadedIds;
    private ListView listview;
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
        listview =(ListView)rootView .findViewById(R.id.downloadListView);
        if(getDownloadMetaData(rootView)){
            List<String> ids = idSplitter();
            for(int i=0;i<ids.size();i++){
                Log.d("test", ids.get(i));
            }
            //Log.d("test", DocumentResources.resourcesFound.size() + " ");
            displayDownloadedContent(ids);
        }
        return rootView;
    }

    // pull ids from format id.pdf or id.webm
    private List<String> idSplitter(){
        List<String> ids = new ArrayList<>();
        for(int i=0;i< ResourceItemDownloaderUtil.allDownloads.size();i++){
            String[] split = ResourceItemDownloaderUtil.allDownloads.get(i).split("\\.");
            ids.add(split[0]);
        }
        return ids;
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
        List<String> ids;
        ids = idSplitter();
        displayDownloadedContent(ids);
    }

    private void displayDownloadedContent(List<String> ids) {
        List<String> downloadedContent = new ArrayList<>();
        for (int i = 0; i < ids.size(); i++) {
            if (DocumentResources.resourcesFound.contains(ids.get(i))) {
                downloadedContent.add(DocumentResources.resourcesFound.get(2 * i + 1).toString());
            }
        }
        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(getActivity(), android.R.layout.simple_list_item_1, downloadedContent);
        listview.setAdapter(adapter);
    }

    @Override
    public Credentials getCredentials() {
        return null;
    }

    public interface OnFragmentInteractionListener {
        void onFragmentInteraction(boolean status);
    }


}
