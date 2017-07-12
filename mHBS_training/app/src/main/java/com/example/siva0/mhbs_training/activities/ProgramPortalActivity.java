package com.example.siva0.mhbs_training.activities;

import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Toast;

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

        // show our button(s) and attach listener action!
        addListenerOnButton();
    }

    public void addListenerOnButton() {
        // TODO: change the placeholder to our actual program images add multiple buttons etc
        ImageButton btn_placeholder = (ImageButton) findViewById(R.id.btn_placeholder);

        btn_placeholder.setOnClickListener(new ImageButton.OnClickListener() {

            @Override
            public void onClick(View view) {

                Toast.makeText(ProgramPortalActivity.this,
                        "ImageButton is clicked!", Toast.LENGTH_SHORT).show();


            }

        });

    }
}
