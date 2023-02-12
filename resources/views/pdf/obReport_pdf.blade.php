<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>OB Report _{{$quote['Ref']}}</title>
      <link rel="stylesheet" href="{{asset('/css/pdf_style.css')}}" media="all" />
   </head>

   <body>
      <header class="clearfix">
         <div id="logo">
         <img src="{{asset('/images/inovet.jpg')}}">
         </div>
         <div id="company">
            <div><strong> Date: </strong>{{$quote['date']}}</div>
            <div><strong> Number: </strong> {{$quote['Ref']}}</div>
         </div>
         <div id="Title-heading">
            OB Report  : {{$quote['Ref']}}
         </div>
         </div>
      </header>
      <main>
         <div id="details" class="clearfix">
            <div id="client">
                <table class="table-sm">
                   <thead>
                      <tr>
                         <th class="desc">Client Info</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td>
                            <div><strong>Client Name :</strong> {{$quote['client_name']}}</div>
                            <div><strong>Reported Branch :</strong>  {{$quote['branch']}}</div>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>

            <div id="invoice">
               <table  class="table-sm">
                  <thead>
                     <tr>
                        <th class="desc">Report Info</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>
                            <div><strong>Reference Number: </strong> {{$quote['Ref']}}</div>
                            <div><strong>Occurence Subject: </strong> {{$quote['subject']}}</div>
                            <div><strong>(Client) Personel Involved: </strong> {{$quote['client_personel']}}</div>
                            <div><strong>(Inovet) Personel Involved: </strong> {{$quote['personel']}}</div>
                            <div><strong>Escalated To: </strong> {{$quote['escalate']}}</div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         <div id="details_inv">
               <table class="table-sm">
                  <thead>
                     <tr>
                        <th class="desc">Reporter Info</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>
                           <div><strong>Reporter Name :</strong> {{$quote['reporter_name']}}</div>
                           <div><strong>Reporter Cell No. :</strong> {{$quote['phone']}}</div>
                           <div><strong>Reporter ID :</strong>  {{$quote['reporter_id']}}</div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         <div id="details_inv">
             <table class="table-sm">
                  <thead>
                     <tr>
                        <th class="desc">Occurence Details</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>
                           <div><strong>{{$quote['note']}}</div>
                        </td>
                     </tr>
                  </tbody>
               </table>
         </div>
         <div id="signature">
            @if($setting['is_invoice_footer'] && $setting['invoice_footer'] !==null)
               <p>{{$setting['invoice_footer']}}</p>
            @endif
         </div>
      </main>
   </body>
</html>
