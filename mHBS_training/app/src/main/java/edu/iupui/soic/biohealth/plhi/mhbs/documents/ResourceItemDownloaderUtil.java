package edu.iupui.soic.biohealth.plhi.mhbs.documents;

import android.content.Context;
import android.os.Environment;

import java.io.File;

public class ResourceItemDownloaderUtil {
    private File resourceDir;
    private Context pContext;
    private final String dirName = "mhbsDocs";
    private String itemType;

    public ResourceItemDownloaderUtil(Context pContext, String itemType) {
        this.pContext = pContext;
        this.itemType = itemType;
    }


    public File getResourceDir() {
        return resourceDir;
    }


    public void tryCreateDirectory() {
        // create external directory to send downloads
        if (isExternalStorageWritable()) {
            resourceDir = createExternalDir();
        } else {
            // sometimes external is unmounted, so we will send to internal in that case
            resourceDir = createInternalDir();
        }
    }

    /* Checks if external storage is available for read and write */
    private boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        return Environment.MEDIA_MOUNTED.equals(state);
    }

    // create external directory if the user has it available
    private File createExternalDir() {
        File dir = null;
        // TODO: if pdf : go to DIRECTORY_DOCUMENTS if video : go to DIRECTORY_VIDEO
        if(itemType.equals("Videos")) {
            dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
        }else {
            dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
        }
            // if "Documents" not created, create it
            if (!dir.exists()) {
                dir.mkdirs();
            }
        // create mHBS specific folder
        File subFile = new File(dir, dirName);
        if (!subFile.exists()) {
            subFile.mkdirs();
        }
        return subFile;
    }


    // create a folder on app's internal directory storage
    private File createInternalDir() {
        File dir = pContext.getDir(dirName, Context.MODE_PRIVATE);
        File subDir = new File(dir, dirName);
        if (!subDir.exists()) {
            subDir.mkdirs();
        }
        return subDir;
    }

    // checks both external and then internal if no file found in external
    public boolean checkDirForDownloads(String itemId) {
        Boolean found = false;
        if (isExternalStorageWritable()) {
            File checkFile = new File( Environment.getExternalStorageDirectory().getPath() + resourceDir + "/");
            found = findItem(checkFile, itemId);
        }
        if (!found) {
            File myFile = createInternalDir();
            found = findItem(myFile, itemId);
        }
        return found;
    }


    // check through directory
    private boolean findItem(File checkFile, String itemId) {
        if(checkFile.list()!=null) {
            for (int i = 0; i < checkFile.list().length; i++) {
                if (checkFile.list()[i].contains(itemId)) {
                    return true;
                }

            }
        }
        return false;
    }

}
