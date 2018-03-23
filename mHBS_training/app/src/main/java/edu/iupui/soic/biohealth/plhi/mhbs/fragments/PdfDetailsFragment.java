/*
* This fragment displays details about individual videos, resources etc..
*/

package edu.iupui.soic.biohealth.plhi.mhbs.fragments;

import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.ContentViewEvent;
import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle;

import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import edu.iupui.soic.biohealth.plhi.mhbs.R;

public class PdfDetailsFragment extends Fragment {
    private String itemToDownload = "";
    private File openResource;
    private View pView;
    private String pdfPath;
    //fabric
    private String contentId;
    private UserAccount userAccount = MetaDataController.getUserAccount();

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("Test", "Creating Video Fragment " + getArguments().toString());
        pdfPath = getArguments().getString("resourceDir");
        itemToDownload = getArguments().getString("itemToDownload");
        onDownloadFinish();
    }


    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup parent, @Nullable Bundle savedInstanceState) {
        // Inflate the xml file for the fragment
        View rootView = inflater.inflate(R.layout.fragment_pdf_details, parent, false);
        pView = rootView;
        return rootView;
    }

    public void onDownloadFinish() {
        // the resource lies in internal storage
        if (pdfPath.contains("app_mhbsDocs")) {
            File parentDir = getContext().getExternalFilesDir(null);
            // always points to internal memory (note, automatically concatenates app_ by default)
            File dir = getContext().getDir("mhbsDocs", Context.MODE_PRIVATE);
            File internalFile = new File(parentDir + "/" + dir);
            openResource = new File(internalFile + "/" + itemToDownload + ".pdf");
        } else {
            // resource is in external storage
            openResource = new File(Environment.getExternalStorageDirectory().getPath() + pdfPath + "/" + itemToDownload + ".pdf");
        }
        contentId = openResource.getName();

    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        PDFView pdfView = (PDFView) pView.findViewById(R.id.pdfView);
        if (openResource != null) {
            //fabric
            DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            Answers.getInstance().logContentView(new ContentViewEvent()
                    .putContentName("PDFView"+","+userAccount.getUId())
                    .putCustomAttribute("pdf start time",userAccount.getUId()+","+sdf.format(date))
                    .putCustomAttribute("Pdf Name",userAccount.getUId()+","+contentId));
            //pdf render
            pdfView.fromFile(openResource).enableDoubletap(true).enableSwipe(true).scrollHandle(new DefaultScrollHandle(getContext())).swipeHorizontal(false).defaultPage(0).load();
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        Answers.getInstance().logContentView(new ContentViewEvent()
                .putContentName("PDFView"+","+userAccount.getUId())
                .putCustomAttribute("pdf end time",userAccount.getUId()+","+sdf.format(date))
                .putCustomAttribute("pdf Name",userAccount.getUId()+","+contentId));
    }

}