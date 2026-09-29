import React from 'react';
import { mockAnalyticsData } from '../../data/mockData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Competency Trend Area Chart */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">Workforce Competency Trend</h3>
            <p className="text-xs text-stone-500">Average practical score improvement over 5 months</p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-900 font-mono font-bold px-2.5 py-1 rounded-full">
            +13% Growth
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockAnalyticsData.competencyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F0" />
              <XAxis dataKey="month" stroke="#78716C" fontSize={11} />
              <YAxis stroke="#78716C" fontSize={11} domain={[60, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="score" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Common Errors Bar Chart */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">Most Common Procedural Errors</h3>
            <p className="text-xs text-stone-500">Analysis of critical mistakes recorded during simulations</p>
          </div>
          <span className="text-xs bg-rose-100 text-rose-900 font-mono font-bold px-2.5 py-1 rounded-full">
            Top Error: 34%
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.commonErrors} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F0" />
              <XAxis type="number" stroke="#78716C" fontSize={11} unit="%" />
              <YAxis dataKey="errorName" type="category" stroke="#78716C" fontSize={10} width={130} />
              <Tooltip contentStyle={{ backgroundColor: '#1C1917', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="percentage" fill="#EA580C" radius={[0, 8, 8, 0]}>
                {mockAnalyticsData.commonErrors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#DC2626' : '#EA580C'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
