import Link from "next/link";
import SearchIcon from "../../icons/Search";
import s from "./SearchForm.module.scss";

export default function InputsSearch({
  handleSubmit,
  name,
  className,
  ...props
}) {
  return (
    <form
      className={s.wrapper + " " + className}
      onSubmit={handleSubmit}
      role="search"
    >
      <input
        className={s.input}
        type="search"
        name={name}
        role="combobox"
        autoComplete="off"
        placeholder="Искать"
        aria-label="Search through site content"
        aria-autocomplete="both"
        aria-controls="search-results"
        aria-expanded="false"
        maxLength="150"
        {...props}
      />
      <Link href={"/"}>
        <a className={s.icon}>
          <SearchIcon />
        </a>
      </Link>
    </form>
  );
}
