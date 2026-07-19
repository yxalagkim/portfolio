interface DecoVideoProps {
  src: string;
  ref?: React.Ref<HTMLDivElement>;
}

const DecoVideo = ({ src, ref }: DecoVideoProps) => {
  return (
    <div ref={ref} className="deco-video">
      <video src={src} autoPlay muted playsInline loop aria-hidden="true" />
    </div>
  );
};

export default DecoVideo;
