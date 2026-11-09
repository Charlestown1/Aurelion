import { Link } from 'react-router-dom';
import { BRAND, BRAND_TAG } from '../data/brand.js';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label={`${BRAND} ${BRAND_TAG} home`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path d="M13 2 24 8v10l-11 6L2 18V8z" fill="none" stroke="#C6A15B" strokeWidth="1.6" />
        <path d="M13 8 18.5 11v5L13 19l-5.5-3v-5z" fill="#C6A15B" />
      </svg>
      <span>{BRAND}<em>{BRAND_TAG}</em></span>
    </Link>
  );
}
