import mongoose, { Document, Schema } from 'mongoose';

export interface IUsageLog extends Document {
  ipAddress: string;
  userAgent: string;
  emailsGenerated: number;
  date: Date;
  createdAt: Date;
}

const usageLogSchema = new Schema<IUsageLog>(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    emailsGenerated: {
      type: Number,
      default: 1,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by IP and date
usageLogSchema.index({ ipAddress: 1, date: 1 });

export const UsageLog = mongoose.model<IUsageLog>('UsageLog', usageLogSchema);
