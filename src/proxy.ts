import { NextResponse, type NextRequest } from 'next/server';

// "/" diarahkan ke /id kalau browser memprioritaskan Bahasa Indonesia, selain itu ke /en
// (target utama pembeli ekspor).
export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept-language') ?? '';
  const first = accept.split(',')[0]?.trim().toLowerCase() ?? '';
  const lang = first.startsWith('id') || first.startsWith('in') ? 'id' : 'en';

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/'],
};
