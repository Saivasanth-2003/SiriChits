const mongoose = require('mongoose');

const ChitPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  chitAmount: { type: Number, required: true },
  monthlyContribution: { type: Number, required: true },
  durationMonths: { type: Number, required: true },
  adminCommissionPercent: { type: Number, default: 5 },
  memberDividendPercent: { type: Number, default: 95 },
  maxSubscribers: { type: Number, required: true },
  currentSubscribers: { type: Number, default: 0 },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  overdueSubscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'active', 'closed'], default: 'upcoming' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('ChitPlan', ChitPlanSchema);
