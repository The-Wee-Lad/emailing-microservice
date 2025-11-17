import { Schema, Document } from 'mongoose';

export interface EmailLog extends Document {
  messageId?: string | null;
  to: string;
  from: string;
  subject?: string;
  content?: string;
  status: 'SENT' | 'FAILED';
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;

  isFailed(): boolean;
}

export const EmailLogSchema = new Schema<EmailLog>(
  {
    messageId: {
      type: String,
      index: true,
    },
    to: {
      type: String,
      required: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
      index: true,
    },
    subject: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['SENT', 'FAILED', 'SENDING'],
      required: true,
      index: true,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

EmailLogSchema.index({ createdAt: -1 });
EmailLogSchema.index({ to: 1, status: 1 });
EmailLogSchema.index({ from: 1, status: 1 });

EmailLogSchema.pre('save', function (next) {
  next();
});
