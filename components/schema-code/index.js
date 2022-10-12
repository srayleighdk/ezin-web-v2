import React from 'react';

export default function SchemaCode({code}) {
  return (
    <script type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: code
          }}
        ></script>
  );
}