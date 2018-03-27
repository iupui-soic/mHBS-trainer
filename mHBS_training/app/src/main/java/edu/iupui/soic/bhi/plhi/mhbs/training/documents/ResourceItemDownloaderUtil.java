package edu.iupui.soic.bhi.plhi.mhbs.training.documents;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ResourceItemDownloaderUtil {
    private File resourceDir;
    private Context pContext;
    private final String dirName = "mhbsDocs";
    private String itemType;
    //TODO change to better solution from public static, Currently downloadlistfragment using
    public static List<ResourceOnDevice> allDownloads;

    public ResourceItemDownloaderUtil() {

    }

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
        if (itemType.equals("Videos")) {
            dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
        } else {
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

    public void setpContext(Context context) {
        this.pContext = context;
    }

    // create a folder on app's internal directory storage
    private File createInternalDir() {
        Log.d("Test", "Trying to create internal " + dirName + " " + pContext.toString());

        File dir = pContext.getDir(dirName, Context.MODE_PRIVATE);
        return dir;
    }

    // checks both external and then internal if no file found in external
    public boolean checkDirForDownloads(String itemId) {
        Boolean found = false;
        if (isExternalStorageWritable()) {
            File checkFile = new File(Environment.getExternalStorageDirectory().getPath() + resourceDir + "/");
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
        if (checkFile.list() != null) {
            for (int i = 0; i < checkFile.list().length; i++) {
                if (checkFile.list()[i].contains(itemId)) {
                    return true;
                }

            }
        }
        return false;
    }

    // checks for all app specific downloads and sends to array
    public void resourceFinder(Context context) {
        List<File> fileArray = new ArrayList<>();
        allDownloads = new ArrayList<>();

        if (isExternalStorageWritable()) {
            // External movie and documents folders
            File movieDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
            File docDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
            // access custom mhbs downloads locations
            File checkMovies = new File(Environment.getExternalStorageDirectory().getPath() + movieDir + "/" + dirName + "/");
            File checkDocs = new File(Environment.getExternalStorageDirectory().getPath() + docDir + "/" + dirName + "/");
            fileArray.add(checkMovies);
            fileArray.add(checkDocs);
        }

        File checkInternal = context.getDir(dirName, Context.MODE_PRIVATE);
        fileArray.add(checkInternal);

        for (int i = 0; i < fileArray.size(); i++) {
            findDownloads(fileArray.get(i));
        }
    }

    private void findDownloads(File checkFile) {
        if (checkFile.list() != null) {
            for (int i = 0; i < checkFile.list().length; i++) {
                addDownloadsFound(checkFile.list()[i], checkFile.toString());
            }
        }
    }

    private void addDownloadsFound(String id, String file) {
        ResourceOnDevice fd = new ResourceOnDevice();
        fd.id = id;
        fd.file = file;
        allDownloads.add(fd);
    }

    public class ResourceOnDevice {
        String id;
        String file;

        public String getFile() {
            return file;
        }

        public String getId() {
            return id;
        }
    }
}