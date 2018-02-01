package edu.iupui.soic.biohealth.plhi.mhbs.adapters;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import edu.iupui.soic.biohealth.plhi.mhbs.R;

import edu.iupui.soic.biohealth.plhi.mhbs.fragments.ItemFragment.OnListFragmentInteractionListener;
import edu.iupui.soic.biohealth.plhi.mhbs.documents.DocumentResources.ResourceItem;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link ResourceItem} and makes a call to the
 * specified {@link OnListFragmentInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class MyItemRecyclerViewAdapter extends RecyclerView.Adapter<MyItemRecyclerViewAdapter.ViewHolder> {

    private final List<ResourceItem> mValues;
    private final OnListFragmentInteractionListener mListener;

    public MyItemRecyclerViewAdapter(List<ResourceItem> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }



    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_rowfragment, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);

        holder.mIdView.setText(mValues.get(position).id);
        holder.mTitleView.setText(mValues.get(position).title);
    //    holder.mInstitutionView.setText(mValues.get(position).institution);

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentInteraction(holder.mItem);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mIdView;
        public final TextView mTitleView;
        public final TextView mInstitutionView;

        public ResourceItem mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mIdView = (TextView) view.findViewById(R.id.titleImage);
            mTitleView = (TextView) view.findViewById(R.id.titleLocation);
            mInstitutionView = (TextView) view.findViewById(R.id.titleLocation);
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }
}
