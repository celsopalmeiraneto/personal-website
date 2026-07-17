export interface PostItProps {
  className?: string;
  id: string;
  title: string;
  tag: string;
  text: string;
  cover: {
    src: string;
    alt: string;
  };
}

export const PostIt = ({ id, title, tag, text, cover, className = "" }: PostItProps) => {
  return (
    <div className={`${className} flex flex-col w-72 md:w-80`}>
      <a className="visited" href={`/posts/${id}`}>
        <img
          className="object-cover h-36 md:h-48 w-full"
          width="288"
          height="144"
          src={cover.src}
          alt={cover.alt}
        />
      </a>
      <a className="visited" href={`/posts/${id}`}>
        <p className="text-2xl">{title}</p>
      </a>
      <a className="visited" href={`/posts/${id}`}>
        <p>{text}</p>
      </a>
      <a className="visited" href={`/posts/${id}`}>
        <span className="text-sm">{tag}</span>
      </a>
    </div>
  );
};
