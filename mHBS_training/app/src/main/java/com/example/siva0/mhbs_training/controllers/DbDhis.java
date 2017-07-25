package com.example.siva0.mhbs_training.controllers;

import com.raizlabs.android.dbflow.annotation.Database;

    @Database(
            name = DbDhis.NAME, version = DbDhis.VERSION
    )

    public final class DbDhis {
        public static final String NAME = "dhis";
        public static final int VERSION = 3;
    }
