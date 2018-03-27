package edu.iupui.soic.bhi.plhi.mhbs.training.fragments;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import edu.iupui.soic.bhi.plhi.mhbs.training.R;
import edu.iupui.soic.bhi.plhi.mhbs.training.activities.CourseInput;

/**
 * A simple {@link Fragment} subclass.
 */
public class CourseDetailsFragment extends Fragment {

    public CourseDetailsFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View wView = inflater.inflate(R.layout.fragment_course_details, container, false);
        LinearLayout linearLayout = (LinearLayout) wView.findViewById(R.id.pdf1);
        linearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(getActivity(),CourseInput.class);
                startActivity(i);
            }
        });

        return wView;

    }

}

