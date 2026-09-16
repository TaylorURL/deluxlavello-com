import Icon from '@components/ui/Icon.jsx';
import { EMAIL, PHONE, SOCIAL } from '@constants/practice.js';

// A thin strip carries the ways to reach the practice, so the bar below it holds
// destinations and nothing else.
export default function UtilityBar() {
  return (
    <div className="utility">
      <div className="utility__inner mx-auto w-[calc(100%-2.5rem)] max-w-shell">
        <ul className="utility__reach">
          <li>
            <a href={PHONE.href}>
              <Icon name="i-phone" />
              <span className="utility__label">{PHONE.label}</span>
            </a>
          </li>
          <li>
            <a href={EMAIL.href} aria-label={`Email ${EMAIL.label}`}>
              <Icon name="i-mail" />
              <span className="utility__label">{EMAIL.label}</span>
            </a>
          </li>
          <li className="utility__place">
            <Icon name="i-pin" />
            Houston, Texas
          </li>
        </ul>
        <ul className="utility__social">
          {SOCIAL.map((profile) => (
            <li key={profile.name}>
              <a href={profile.href} rel="me noopener" target="_blank" aria-label={profile.name}>
                <Icon name={profile.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
