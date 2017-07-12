package com.example.siva0.mhbs_training.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.example.siva0.mhbs_training.R;

public class resourcesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resource);
        Toast.makeText(getApplicationContext(), getIntent().getStringExtra("resourceKey"), Toast.LENGTH_SHORT).show();

    }
}
