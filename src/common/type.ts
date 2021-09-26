export type TreeProps = {
  title: string;
  key: string;
  visible: string[];
  children: {
    title: string;
    key: string;
    isLeaf: boolean;
    visible: string[];
  }[];
};
