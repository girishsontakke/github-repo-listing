import styles from "./VisibilityTag.module.scss";

interface Iprops {
  isPrivate: boolean;
}
function VisibilityTag(props: Iprops) {
  const { isPrivate } = props;
  return (
    <div className={styles.tagWrapper}>{isPrivate ? "private" : "public"}</div>
  );
}

export default VisibilityTag;
