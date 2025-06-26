export default function MainMenuLink({ active, callbackOnClick, label, url }) {
  return (
    <li
      className="nav-item"
      onClick={callbackOnClick}
    >
      <a
        className={`page-scroll ${active ? "active" : ""}`}
        href={`/${url}`}
      >
        {label}
      </a>
    </li>
  );
}
