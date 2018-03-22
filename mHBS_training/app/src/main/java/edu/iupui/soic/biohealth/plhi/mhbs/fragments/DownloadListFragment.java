package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.hisp.dhis.android.sdk.network.Credentials;

import java.util.ArrayList;
import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloaderUtil;


public class DownloadListFragment extends Fragment implements DocumentResources.AsyncResponse {
    private OnFragmentInteractionListener mListener;
    Snackbar mySnackbar;
    private ListView listview;
    private ResourceItemDownloaderUtil rdUtil;

    public DownloadListFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        rdUtil = new ResourceItemDownloaderUtil();
        rdUtil.resourceFinder(this.getContext());

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_download_list, container, false);
        listview = (ListView) rootView.findViewById(R.id.downloadListView);
        ResourceItemDownloaderUtil.ResourceOnDevice resourceOnDevice;
        ((AppCompatActivity)getActivity()).getSupportActionBar().setTitle("Downloaded Content");

        for(int i=0;i<ResourceItemDownloaderUtil.allDownloads.size();i++){
            resourceOnDevice = ResourceItemDownloaderUtil.allDownloads.get(i);
        }

        // if we can pull the element titles
        if (canGetDownloadMetaData()) {
            final List<String> ids = idSplitter();
            // get list of titles matching ids containing all downloaded content.
            displayDownloadedContent(ids);
        } else {
            // otherwise we will get the element titles and then display
            getMetaData(rootView);
        }

        return rootView;
    }

    // pull ids from format id.pdf or id.webm
    private List<String> idSplitter() {
        List<String> ids = new ArrayList<>();

        for (int i = 0; i < ResourceItemDownloaderUtil.allDownloads.size(); i++) {
            String[] split = ResourceItemDownloaderUtil.allDownloads.get(i).getId().split("\\.");
            ids.add(split[0]);
        }

        return ids;
    }

    private boolean canGetDownloadMetaData() {
        DocumentResources documentResources = new DocumentResources();
        if (documentResources.getResourcesLength() > 0) {
            return true;
        } else {
            return false;
        }
    }

    private void getMetaData(View view) {
        mListener.onDownloadStatus(false);
        //executing any resource will synchronize resourcesFound array we need
        new DocumentResources(this).execute("Resources");
        mySnackbar = Snackbar.make(view, getActivity().getString(R.string.syncDownloads), Snackbar.LENGTH_INDEFINITE);
        mySnackbar.show();
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
        ((AppCompatActivity)getActivity()).getSupportActionBar().setTitle(getString(R.string.title_activity_main));

        mListener = null;
    }

    @Override
    public void processFinish(List<DocumentResources.ResourceItem> output) {
        // after synchronizing, remove progress bar and snack bar
        mySnackbar.dismiss();
        mListener.onDownloadStatus(true);
        // display titles
        List<String> ids;
        ids = idSplitter();
        displayDownloadedContent(ids);
    }

    private void displayDownloadedContent(final List<String> ids) {
        List<String> downloadedContent = new ArrayList<>();
        for (int i = 0; i < ids.size(); i++) {
            if (DocumentResources.resourcesFound.contains(ids.get(i))) {
                downloadedContent.add(DocumentResources.resourcesFound.get(2 * i + 1).toString());
       //         ResourceItemDownloaderUtil.allDownloads.get(i).setTitle(DocumentResources.resourcesFound.get(2 * i + 1).toString());
            }
        }
        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(getActivity(), android.R.layout.simple_list_item_1, downloadedContent);
        listview.setAdapter(adapter);
        listview.setClickable(true);
        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {

                ResourceItemDownloaderUtil.ResourceOnDevice resourceOnDevice = ResourceItemDownloaderUtil.allDownloads.get(position);
                Fragment videoFrag = new VideoDetailsFragment();
                String url = resourceOnDevice.getFile();
                String id = resourceOnDevice.getId();

                if(id.contains(".webm"))

                Log.d("Test", url + " THIS IS THE URL ");
                Log.d("Test", id + " THIS IS THE ID ");
                Log.d("Test", ids.get(position) + "THIS IS THE POS");

                Bundle b = new Bundle();
                b.putString("itemToDownload", ids.get(position));
                //TODO: change to use regex
                String fileName = url.substring(19);
                b.putString("resourceDir", fileName);
                videoFrag.setArguments(b);
                getChildFragmentManager().beginTransaction().add(R.id.downloadList_fragment_container,videoFrag).addToBackStack(null).commit();

            }
        });
    }

    @Override
    public Credentials getCredentials() {
        return null;
    }


    public interface OnFragmentInteractionListener {
        void onDownloadStatus(boolean status);
        void onFragmentInteraction(String id, String file);
    }

}
