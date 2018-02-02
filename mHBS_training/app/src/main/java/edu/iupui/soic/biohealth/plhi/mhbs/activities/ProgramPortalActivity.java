/*
* This activity contains image buttons with program names, which when clicked
* brings up resources/videos associated with that program
 */

package edu.iupui.soic.biohealth.plhi.mhbs.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;

import edu.iupui.soic.biohealth.plhi.mhbs.R;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources;


public class ProgramPortalActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_program_portal);

        // get the type of data (video, resource or course) that was requested
        String activity = getIntent().getStringExtra("resourceKey");

        // show our button(s) and attach listener action!
        addListenerOnButton(activity);

        // back bar
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

    }

    public void addListenerOnButton(final String data) {

        ImageButton btn_program = (ImageButton) findViewById(R.id.btn_allPrograms);
        btn_program.setOnClickListener(new ImageButton.OnClickListener() {

            @Override
            public void onClick(View view) {
                startActivity(new Intent(ProgramPortalActivity.this, ResourcesActivity.class).putExtra("resourceKey", data));
            }
        });
    }

    @Override
    public boolean onSupportNavigateUp(){
        finish();
        return true;
    }

}
