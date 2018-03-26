package edu.iupui.soic.biohealth.plhi.mhbs.activities;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.ContentViewEvent;
import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.listener.OnPageScrollListener;
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle;


import org.hisp.dhis.android.sdk.controllers.metadata.MetaDataController;
import org.hisp.dhis.android.sdk.persistence.models.UserAccount;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import edu.iupui.soic.biohealth.plhi.mhbs.R;

import static com.raizlabs.android.dbflow.config.FlowManager.getContext;

public class CourseInput extends AppCompatActivity {
    PDFView pdfview;
    static int pageNumber;
    //get the user details from login
    UserAccount userAccount = MetaDataController.getUserAccount();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //fabric
        setContentView(R.layout.fragment_course_pdf);

        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        Answers.getInstance().logContentView(new ContentViewEvent()
                .putContentName("Course view"+","+userAccount.getUId())
                .putCustomAttribute("FirstPageNumber", userAccount.getUId()+","+Integer.toString(pageNumber+ 1))
                .putCustomAttribute("courseStartTime", userAccount.getUId()+","+sdf.format(date)));
        //render pdf
        pdfview = (PDFView) findViewById(R.id.pdfCourse);
        pdfview.fromAsset("mHBSProviderGuide.pdf")
                .defaultPage(pageNumber)
                .enableSwipe(true)
                .swipeHorizontal(true)
                .scrollHandle(new DefaultScrollHandle(getContext()))
                .onPageScroll(new OnPageScrollListener() {
                    @Override
                    public void onPageScrolled(int page, float positionOffset) {
                        pageNumber=pdfview.getCurrentPage();
                    }
                })
                .enableDoubletap(true)
                .enableAnnotationRendering(true)
                .load();
        //next button
        Button btnNext = (Button) findViewById(R.id.btnNext);
        btnNext.setOnClickListener(new View.OnClickListener() {
                                       @Override
                                       public void onClick(View view) {
                                           pageNumber = pdfview.getCurrentPage();
                                           pdfview.jumpTo(pageNumber+1);

                                       }
                                   });
        //previous page
        Button btnPrev = (Button) findViewById(R.id.btnBack);
        btnPrev.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pageNumber = pdfview.getCurrentPage();
                pdfview.jumpTo(pageNumber-1);

            }
        });
    }

    @Override
    public void onStop() {
        super.onStop();
        pageNumber=pdfview.getCurrentPage();
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        Answers.getInstance().logContentView(new ContentViewEvent()
                .putContentName("Course view"+","+userAccount.getUId())
                .putCustomAttribute("lastPageNumber", userAccount.getUId()+","+Integer.toString(pageNumber + 1))
                .putCustomAttribute("courseEndTime", userAccount.getUId()+","+sdf.format(date)));
    }
}
