package com.example.siva0.mhbs_training.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;

import com.example.siva0.mhbs_training.R;

public class ProgramPortalActivity extends AppCompatActivity {

    // TODO: this activity has images that are associated with different programs such as ECEB, HBB, etc.
    // this activity will be called when videos, resources or courses are clicked and it sorts the resources
    // by program. This will need to call resources with certain tags associated with that program on button click
    // TODO: add the back button and search icon in the app bar

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_program_portal);

        // get the type of data (video, resource or course) that was requested
        String data = getIntent().getStringExtra("resourceKey");

        // show our button(s) and attach listener action!
        addListenerOnButton(data);

    }

    public void addListenerOnButton(final String data) {
        ImageButton btn_program = (ImageButton) findViewById(R.id.btn_program);

        btn_program.setOnClickListener(new ImageButton.OnClickListener() {

            @Override
            public void onClick(View view) {
            // TODO: instead of hardcoding the cases, abstractify names, this is just a quick placeholder way
                switch(data){
                    case "Resources":
                        //TODO: pass the name of the program clicked to get appropriate resources
                        startActivity( new Intent(ProgramPortalActivity.this, ResourcesActivity.class).putExtra("resourceKey",data));
                        break;
                    case "Videos":
                        //TODO: pass the name of the program clicked to get appropriate resources

                        startActivity( new Intent(ProgramPortalActivity.this, VideosActivity.class).putExtra("resourceKey",data));
                        break;
                    case "Courses":
                        //TODO: pass the name of the program clicked to get appropriate resources
                        startActivity( new Intent(ProgramPortalActivity.this, VideosActivity.class).putExtra("resourceKey",data));
                        break;
                }
            }

        });

    }
}
