package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

/**
 * Created by ezm on 1/30/18.
 */

public class ResourceItemDownloader {

    private DocumentResources.ResourceItem myRes;
    private String pdfURL = "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf";
    Context pContext;

    public ResourceItemDownloader(Context context) {
        pContext = context;
        // pass in a resource item myRes = Item;
        new Thread(new Runnable() {
            public void run() {
                DownloadFiles();
            }
        }).start();
    }

    public void DownloadFiles() {

        try {
            URL u = new URL(pdfURL);
            InputStream is = u.openStream();

            DataInputStream dis = new DataInputStream(is);

            byte[] buffer = new byte[1024];
            int length;

            // /storage/emulated/0
            FileOutputStream fos = new FileOutputStream(new File(Environment.getExternalStorageDirectory() + "/" + "data/test.kml"));
            while ((length = dis.read(buffer)) > 0) {
                fos.write(buffer, 0, length);
            }

        } catch (IOException | SecurityException e) {
            Log.e("SYNC getUpdate", e.getMessage());
        }
    }
}

