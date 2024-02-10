import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import math from 'remark-math';
import gemoji from 'remark-gemoji';
import breaks from 'remark-breaks';

const useMarkdown = (markdown: string) => {
  return <ReactMarkdown remarkPlugins={[gfm, math, gemoji, breaks]}>{markdown}</ReactMarkdown>;
};

export default useMarkdown;
