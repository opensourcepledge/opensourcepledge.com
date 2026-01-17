<?xml version="1.0" encoding="utf-8"?>
<!--
// © Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0
-->
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          RSS Feed | <xsl:value-of select="/rss/channel/title"/>
        </title>
        <link rel="stylesheet" href="/common.css"/>
      </head>
      <body>
        <main class="container">
          <div class="highlight-box">
            <strong>This is an RSS feed.</strong>
            Subscribe by copying the URL from the address bar into your newsreader.
            Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more.
          </div>
          <section>
            <div class="text-center">
              <h1><xsl:value-of select="/rss/channel/title"/></h1>
            </div>
            <div>
              <xsl:for-each select="/rss/channel/item">
                <div class="article-listing">
                  <blockquote>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="link"/>
                      </xsl:attribute>
                      <h2><xsl:value-of select="title"/></h2>
                    </a>
                  </blockquote>
                  <div class="meta">
                    <div>
                      <em>
                        <xsl:value-of select="author"/>
                      </em>
                      <time>
                        <xsl:value-of select="substring(pubDate, 6, 11)"/>
                      </time>
                    </div>
                  </div>
                  <hr/>
                </div>
              </xsl:for-each>
            </div>
          </section>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
