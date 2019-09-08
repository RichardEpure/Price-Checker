import requests
from django import http
from django.conf import settings
from django.template import engines
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView


# def search(request):
#     search_value = request.GET.get('search', '')

#     data = '''
#         [
#             {
#                 "name": "'''+search_value+'''",
#                 "store": "unspecified",
#                 "price": "0.00"
#             }
#         ]'''

#     extraContent = """
#     <script type='text/JavaScript'> 
#         var django_data = """+data+""";
#     </script>
#     """
#     if(settings.DEBUG):
#         return catchall_dev(request, extraContent)
#     else:
#         return TemplateView.as_view(template_name='index.html')

def search(request):
    search_value = request.GET.get('search', '')
    data = [
        {
            "name": search_value,
            "store": "unspec",
            "price": "0.00"
        },
        {
            "name": "api-test",
            "store": "unspec-api",
            "price": "0.00"
        }
    ]

    return http.JsonResponse(data, safe=False)


@csrf_exempt
def catchall_dev(request, extraContent="", upstream='http://localhost:3000'):
    upstream_url = upstream + request.path
    method = request.META['REQUEST_METHOD'].lower()
    response = getattr(requests, method)(upstream_url, stream=True)
    content_type = response.headers.get('Content-Type')

    if request.META.get('HTTP_UPGRADE', '').lower() == 'websocket':
        return http.HttpResponse(
            content = "WebSocket connections aren't supported",
            status = 501,
            reason = "Not implemented"
        )
    elif content_type == 'text/html; charset=UTF-8':
        return http.HttpResponse(
            content = engines['django'].from_string(extraContent + response.text).render(),
            status = response.status_code,
            reason = response.reason,
        )
    else:
        return http.StreamingHttpResponse(
            streaming_content = response.iter_content(2 ** 12),
            content_type = content_type,
            status = response.status_code,
            reason = response.reason,
        )

global catchall
catchall_prod = TemplateView.as_view(template_name='index.html')
catchall = catchall_dev if settings.DEBUG else catchall_prod