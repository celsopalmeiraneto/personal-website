import Head from "next/head";

const UsesPage = () => (
  <div className="container mx-auto flex flex-col gap-3">
    <Head>
      <title>Celso Palmeira Neto's HP - Uses</title>
    </Head>
    <h1 className="text-3xl font-thin">Uses</h1>
    <p>Here you'll find the tools I use on my day-to-day life.</p>
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl">Hardware</h2>
      <section>
        <h3 className="text-xl underline visited">
          <a
            className="underline visited"
            href="https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/thinkpad-edge-laptops/thinkpad-e14-gen-3"
          >
            Laptop - Lenovo ThinkPad E14 Gen3 14"
          </a>
        </h3>
        <ul className="list-disc ml-5">
          <li>AMD Ryzen 7 5700U with Radeon Graphics</li>
          <li>24GB RAM</li>
          <li>1.5TB NVMe SSD</li>
          <li>Debian 12</li>
        </ul>
      </section>
      <section>
        <h3 className="text-xl">Laptop - MacBook Pro 13", 2020</h3>
        <ul className="list-disc ml-5">
          <li>Intel Core i5, 12GHz Quad-Core</li>
          <li>16GB RAM</li>
          <li>500GB SSD</li>
          <li>macOS 15</li>
        </ul>
      </section>
      <section>
        <h3>
          <a
            className="underline visited"
            href="https://aoc.com/uk/gaming/products/monitors/g2590vxq"
          >
            Monitor - AOC G2590VXQ 24.5" FHD
          </a>
        </h3>
      </section>
      <section>
        <h3 className="text-xl">UGREEN Revodok Pro 210 Docking Station</h3>
      </section>
      <section>
        <h3 className="text-xl">Keyboard - RAZOR BLACKWIDOW v3</h3>
      </section>
      <section>
        <h3 className="text-xl">Mouse - KROM Kane</h3>
      </section>
      <section>
        <h3 className="text-xl">USB Hub - tp-link UH700</h3>
        <p>7 USB ports, three of them 1.5A.</p>
      </section>
    </section>
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl">Software</h2>
      <section>
        <h3 className="text-xl">VSCode</h3>
        <p>Extensions</p>
        <ul className="list-disc ml-5">
          <li>
            <a
              className="underline visited"
              href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker"
            >
              Code Spell Checker
            </a>
          </li>
          <li>
            <a
              className="underline visited"
              href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens"
            >
              GitLens
            </a>
          </li>
          <li>
            <a
              className="underline visited"
              href="https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum"
            >
              Lorem Ipsum
            </a>
          </li>
          <li>
            <a
              className="underline visited"
              href="https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons"
            >
              VSCode Icons
            </a>
          </li>
        </ul>
        <h3 className="text-xl">
          <a className="underline visited" href="https://github.com/tmux/tmux/wiki">
            tmux
          </a>
        </h3>
      </section>
    </section>
    <section>
      <h2 className="text-2xl">Software Engineering</h2>
      <section>
        <h3 className="text-xl">Programming Languages</h3>
        <p>
          Since 2019 I've been mainly working with JavaScript + Node, but here's a list of the
          languages I professionally worked with:
        </p>
        <ul className="list-disc ml-5">
          <li>
            <a
              className="underline visited"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            >
              JavaScript
            </a>{" "}
            (
            <a className="underline visited" href="https://nodejs.org/en">
              Node.js
            </a>{" "}
            /{" "}
            <a className="underline visited" href="https://nextjs.org/">
              Next.JS
            </a>{" "}
            /{" "}
            <a className="underline visited" href="https://react.dev/">
              React
            </a>{" "}
            )
          </li>
          <li>
            <a className="underline visited" href="https://www.ruby-lang.org/en/">
              Ruby
            </a>{" "}
            (
            <a className="underline visited" href="https://rubyonrails.org/">
              Ruby on Rails
            </a>
            )
          </li>
          <li>
            <a
              className="underline visited"
              href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/"
            >
              C#
            </a>{" "}
            (
            <a className="underline visited" href="https://dotnet.microsoft.com/en-us/apps/aspnet">
              ASP.NET
            </a>
            )
          </li>
          <li>
            <a
              className="underline visited"
              href="https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/abenabap_overview.htm"
            >
              ABAP
            </a>
          </li>
          <li>
            <a className="underline visited" href="https://www.php.net/">
              PHP
            </a>
          </li>
          <li>
            <a className="underline visited" href="http://www.xharbour.org/">
              XHarbour
            </a>{" "}
            /{" "}
            <a
              className="underline visited"
              href="https://en.wikipedia.org/wiki/Clipper_(programming_language)"
            >
              Clipper
            </a>
          </li>
        </ul>
      </section>
    </section>
    <section>
      <h2 className="text-2xl">Gadgets</h2>
      <section>
        <h3 className="text-xl">Headphones - Bose QC35 II</h3>
        <p>I always setup the Action Button to adjust the level of Noise Cancellation.</p>
      </section>
      <section>
        <h3 className="text-xl">Microphone - HyperX SoloCast</h3>
      </section>
      <section>
        <h3 className="text-xl">Earphones - Soundcore Sport X10</h3>
      </section>
      <section>
        <h3 className="text-xl">Phone - iPhone 11</h3>
      </section>
    </section>
  </div>
);

export default UsesPage;
