'use client';

import { useState } from 'react';

const RATE_OPTIONS = [4, 6, 8, 10, 12, 14, 16, 18];

export default function BillCalculator() {
  const [bill, setBill] = useState('');
  const [rate, setRate] = useState(8);

  const monthlyBill = parseFloat(bill) || 0;

  const years = [];
  let current = monthlyBill;
  let totalPaid = 0;

  for (let y = 0; y <= 10; y++) {
    if (y === 0) {
      totalPaid += current * 12;
      years.push({
        year: y,
        label: 'Today',
        monthly: current,
        increase: 0,
        annualTotal: current * 12,
        cumulativePaid: totalPaid,
      });
    } else {
      const prev = current;
      current = prev * (1 + rate / 100);
      const monthlyIncrease = current - monthlyBill;
      totalPaid += current * 12;
      years.push({
        year: y,
        label: `Year ${y}`,
        monthly: current,
        increase: monthlyIncrease,
        annualTotal: current * 12,
        cumulativePaid: totalPaid,
      });
    }
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ margin: '2.5rem 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(197,162,88,0.15)' }}>
      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(197,162,88,0.08)', borderBottom: '1px solid rgba(197,162,88,0.1)' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.625rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#C5A258',
          margin: 0,
        }}>
          Rate Increase Calculator
        </p>
      </div>

      {/* Inputs */}
      <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontWeight: 500, letterSpacing: '0.05em' }}>
            Monthly Bill Average
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(197,162,88,0.5)', fontSize: '0.9375rem', fontWeight: 600 }}>$</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="250"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem 0.625rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.9375rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontWeight: 500, letterSpacing: '0.05em' }}>
            Annual Rate Increase
          </label>
          <select
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              outline: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
          >
            {RATE_OPTIONS.map((r) => (
              <option key={r} value={r} style={{ background: '#111518', color: '#fff' }}>
                {r}% per year
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {monthlyBill > 0 && (
        <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
          {/* Summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginBottom: '1.5rem', background: 'rgba(197,162,88,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#C5A258', lineHeight: 1 }}>
                {fmt(years[5]?.monthly || 0)}
              </div>
              <div style={{ fontSize: '0.5625rem', color: '#9BBFAB', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.375rem', fontWeight: 600 }}>
                Monthly in Year 5
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#C5A258', lineHeight: 1 }}>
                {fmt(years[10]?.monthly || 0)}
              </div>
              <div style={{ fontSize: '0.5625rem', color: '#9BBFAB', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.375rem', fontWeight: 600 }}>
                Monthly in Year 10
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#C5A258', lineHeight: 1 }}>
                {fmt(years[10]?.cumulativePaid || 0)}
              </div>
              <div style={{ fontSize: '0.5625rem', color: '#9BBFAB', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.375rem', fontWeight: 600 }}>
                Total Paid Over 10 Years
              </div>
            </div>
          </div>

          {/* Year by year table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(197,162,88,0.15)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'rgba(197,162,88,0.5)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}></th>
                  <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', color: 'rgba(197,162,88,0.5)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Monthly Bill</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', color: 'rgba(197,162,88,0.5)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Monthly Increase</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', color: 'rgba(197,162,88,0.5)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Annual Total</th>
                </tr>
              </thead>
              <tbody>
                {years.map((y) => (
                  <tr key={y.year} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: y.year === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', fontWeight: y.year === 0 ? 600 : 400 }}>
                      {y.label}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: '#FFFFFF', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      {fmt(y.monthly)}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: y.increase > 0 ? '#e57373' : 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                      {y.increase > 0 ? `+${fmt(y.increase)}` : '—'}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                      {fmt(y.annualTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
