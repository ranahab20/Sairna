import Breadcrumb from './components/Breadcrumb';
import SectionHeading from '../../components/shared/SectionHeading';
import CompanyCard from './components/CompanyCard';
import { useGetCompanies } from '../../api/companies'; // تأكدي من المسار

function Companies() {
  const { data: companies, isLoading } = useGetCompanies();

  return (
    <main className="bg-bg-main min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-8">
        
        {/* شريط التنقل */}
        <Breadcrumb />

        {/* عنوان الصفحة */}
        <div className="mb-10">
          <SectionHeading 
            eyebrow="شركاء الطريق"
            title="شركات بتوصلك"
            highlight="لوين ما بدك."
            subtitle="تعرّف على شركات النقل الموجودة في النموذج واختار الأنسب إلك."
            align="right"
            size="md"
          />
        </div>

        {/* شبكة الكروت */}
        {isLoading ? (
          <div className="text-center py-10 text-muted">جاري تحميل الشركات...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies?.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}

        {/* ملاحظة أسفل الصفحة */}
        <p className="text-center text-xs text-muted mt-10">
          ملاحظة: أسماء الشركات وتقييماتها وأوقات الرحلات المعروضة بيانات توضيحية ضمن مشروع التدريب.
        </p>

      </div>
    </main>
  );
}

export default Companies;