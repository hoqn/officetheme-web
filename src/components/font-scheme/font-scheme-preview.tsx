interface FontSchemePreview {
  majorFont: string;
  minorFont: string;
}

export default function FontSchemePreview({ majorFont, minorFont }: FontSchemePreview) {
  return (
    <div>
      <div>
        <h2 className="text-sm" style={{ fontFamily: majorFont }}>
          This is Heading
        </h2>
        <p className="text-xs" style={{ fontFamily: minorFont }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eaque sit tempora cum illum. Voluptatibus
          similique nulla quas dolorum praesentium atque error debitis nisi voluptates! Quibusdam porro officia cumque
          quo?
        </p>
      </div>
    </div>
  );
}
