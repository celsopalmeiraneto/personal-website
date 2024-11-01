import styles from "./index.module.scss";

const UsesPage = () => (
  <div id={styles.container}>
    <h1>Uses</h1>
    <p>Here you'll find the tools I use on my day-to-day life.</p>
    <section>
      <h2>Hardware</h2>
      <section>
        <h3>
          <a href="https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/thinkpad-edge-laptops/thinkpad-e14-gen-3">
            Laptop - Lenovo ThinkPad E14 Gen3 14"
          </a>
        </h3>
        <ul>
          <li>AMD Ryzen 7 5700U with Radeon Graphics</li>
          <li>24GB RAM</li>
          <li>1.5TB NVMe SSD</li>
          <li>Debian 12</li>
        </ul>
      </section>
      <section>
        <h3>Laptop - MacBook Pro 13", 2020</h3>
        <ul>
          <li>Intel Core i5, 12GHz Quad-Core</li>
          <li>16GB RAM</li>
          <li>500GB SSD</li>
          <li>macOS 15</li>
        </ul>
      </section>
      <section>
        <h3>
          <a href="https://aoc.com/uk/gaming/products/monitors/g2590vxq">
            Monitor - AOC G2590VXQ 24.5" FHD
          </a>
        </h3>
      </section>
      <section>
        <h3>UGREEN Revodok Pro 210 Docking Station</h3>
      </section>
      <section>
        <h3>Keyboard - RAZOR BLACKWIDOW v3</h3>
      </section>
      <section>
        <h3>Mouse - KROM Kane</h3>
      </section>
      <section>
        <h3>USB Hub - tp-link UH700</h3>
        <p>7 USB ports, three of them 1.5A.</p>
      </section>
    </section>
    <section>
      <h2>Software</h2>
      <section>
        <h3>VSCode</h3>
        <p>Extensions</p>
        <ul>
          <li>
            <a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker">
              Code Spell Checker
            </a>
          </li>
          <li>
            <a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens">
              GitLens
            </a>
          </li>
          <li>
            <a href="https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum">
              Lorem Ipsum
            </a>
          </li>
          <li>
            <a href="https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons">
              VSCode Icons
            </a>
          </li>
        </ul>
        <h3>tmux</h3>
      </section>
    </section>
    <section>
      <h2>Software Engineering</h2>
      <section>
        <h3>Programming Languages</h3>
        <p>
          Since 2019 I've been mainly working with JavaScript + Node, but here's a list of the
          languages I professionally worked with:
        </p>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a> (
            <a href="https://nodejs.org/en">Node.js</a> / <a href="https://nextjs.org/">Next.JS</a>{" "}
            / <a href="https://react.dev/">React</a> )
          </li>
          <li>
            <a href="https://www.ruby-lang.org/en/">Ruby</a> (
            <a href="https://rubyonrails.org/">Ruby on Rails</a>)
          </li>
          <li>
            <a href="https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/">C#</a> (
            <a href="https://dotnet.microsoft.com/en-us/apps/aspnet">ASP.NET</a>)
          </li>
          <li>
            <a href="https://help.sap.com/doc/abapdocu_752_index_htm/7.52/en-US/abenabap_overview.htm">
              ABAP
            </a>
          </li>
          <li>
            <a href="https://www.php.net/">PHP</a>
          </li>
          <li>
            <a href="http://www.xharbour.org/">XHarbour</a> /{" "}
            <a href="https://en.wikipedia.org/wiki/Clipper_(programming_language)">Clipper</a>
          </li>
        </ul>
      </section>
    </section>
    <section>
      <h2>Gadgets</h2>
      <section>
        <h3>Headphones - Bose QC35 II</h3>
        <p>I always setup the Action Button to adjust the level of Noise Cancellation.</p>
      </section>
      <section>
        <h3>Microphone - HyperX SoloCast</h3>
      </section>
      <section>
        <h3>Earphones - Soundcore Sport X10</h3>
      </section>
      <section>
        <h3>Phone - iPhone 11</h3>
      </section>
    </section>
  </div>
);

export default UsesPage;
