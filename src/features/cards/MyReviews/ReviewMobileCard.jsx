import { Calendar, Edit2, MapPin, Star, Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/auth.utils";
import React from "react";

const ReviewMobileCard = ({ review, onEdit, onDelete }) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="flex gap-4 mb-4">
        <div className="avatar">
          <div className="w-20 h-20 rounded-xl ring-2 ring-primary/20">
            <img 
              src={review.food.image[review.imageIndex]} 
              alt={review.food.name}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold font-popins text-base-content mb-1 truncate">
            {review.food.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="badge badge-sm bg-primary/10 text-primary border-0">
              {review.food.category}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs font-semibold">{review.rating}.0</span>
            </div>
          </div>
          <div className="text-sm text-neutral flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{review.restaurantName}</span>
          </div>
          <div className="text-xs text-neutral flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(review.createdAt)}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(review._id)}
          className="btn btn-sm btn-primary flex-1 rounded-xl gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(review)}
          className="btn btn-sm btn-error btn-outline flex-1 rounded-xl gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewMobileCard;