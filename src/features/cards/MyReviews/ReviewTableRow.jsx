import { Calendar, Edit2, MapPin, Star, Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/auth.utils";
import React from "react";

const ReviewTableRow = ({ review, onEdit, onDelete }) => {
 
  return (
    <tr className="hover:bg-[oklch(97%_0.015_60)] transition-colors">
      {/* Food Image & Name */}
      <td>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 ring-2 ring-primary/20">
              <img 
                src={review.food.image[review.imageIndex]} 
                alt={review.food.name}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-bold font-popins text-base-content mb-1">
              {review.food.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-sm bg-primary/10 text-primary border-0">
                {review.food.category}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span className="text-xs font-semibold text-neutral">{review.rating}.0</span>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* Restaurant Name */}
      <td>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold font-inter text-base-content">
              {review.restaurantName}
            </div>
            <div className="text-sm text-neutral">
              {review.restaurantLocation}
            </div>
          </div>
        </div>
      </td>

      {/* Posted Date */}
      <td>
        <div className="flex items-center gap-2 text-neutral">
          <Calendar className="w-4 h-4" />
          <span className="font-inter">{formatDate(review.createdAt)}</span>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(review._id)}
            className="btn btn-sm btn-ghost text-primary hover:bg-primary hover:text-white rounded-xl gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(review)}
            className="btn btn-sm btn-ghost text-error hover:bg-error hover:text-white rounded-xl gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableRow;