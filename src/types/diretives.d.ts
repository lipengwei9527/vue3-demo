type Rect = {
  offsetWidth: number; //content+padding+border+scrollBar(滚动条的像素)
  offsetHeight: number;
  scrollWidth: number; //content+padding+scrollContent(滚动内容的像素)
  scrollHeight: number;
  clientWidth: number; //元视口素包括:content+padding
  clientHeight: number;
  width: number; //元素包括:content
  height: number;
};
