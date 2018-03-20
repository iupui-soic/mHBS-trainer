package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.List;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloader;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.ResourceItemDownloaderUtil;


public class DownloadListFragment extends Fragment {
    private OnFragmentInteractionListener mListener;

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
        ListView listview =(ListView)rootView .findViewById(R.id.downloadListView);

        ArrayAdapter<String> adapter =
                new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, ResourceItemDownloaderUtil.allDownloads);
        listview.setAdapter(adapter);
        return rootView;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
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

    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
