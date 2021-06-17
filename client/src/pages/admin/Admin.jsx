import { useEffect, useState } from 'react';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';

import AdminCard from './components/AdminCard';
import { getAdminRequests } from '../../services';
import {
  approveRequest,
  rejectRequest,
} from '../../services/superAdminService';

const AdminPage = () => {
  const [approvedAdmins, setApprovedAdmins] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAdminRequests();

        response.data.users.forEach(user => {
          if (user.approved) {
            setApprovedAdmins(approvedAdmins => [...approvedAdmins, user]);
          } else {
            setPendingAdmins(pendingAdmins => [...pendingAdmins, user]);
          }
        });
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);

  const approve = async userId => {
    try {
      await approveRequest(userId);

      toast.success('Admin approved successfully');

      const newAdmin = pendingAdmins.find(admin => admin.id === userId);

      setPendingAdmins(pendingAdmins.filter(admin => admin.id !== userId));

      setApprovedAdmins([...approvedAdmins, newAdmin]);
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  const reject = async userId => {
    try {
      await rejectRequest(userId);

      toast.success('Admin Rejected successfully');

      // const newAdmin = pendingAdmins.find(admin => admin.id === userId);

      setPendingAdmins(pendingAdmins.filter(admin => admin.id !== userId));

      setApprovedAdmins([...approvedAdmins]);
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };

  return (
    <div style={{ minHeight: '92vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <h4 className='display-4 text-center'>Admin Requests</h4>
        <hr />
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            {pendingAdmins.length > 0 && (
              <>
                <h4 className='display-6'>Pending Requests</h4>
                <hr />
              </>
            )}

            {pendingAdmins.map(admin => (
              <div key={admin.id} className='col-md-3'>
                <Card
                  style={{
                    backgroundColor: '#fff',
                    marginBottom: '2rem',
                    minWidth: 'fit-content',
                  }}
                >
                  <AdminCard admin={admin} approve={approve} reject={reject} />
                </Card>
              </div>
            ))}
          </div>
          <div className='col-md-6 col-sm-12'>
            <h4 className='display-6'>Approved Admins</h4>
            <hr />

            {approvedAdmins.map(admin => (
              <div key={admin.id} className='col-md-3'>
                <Card
                  style={{
                    backgroundColor: '#d8f3dc',
                    marginBottom: '2rem',
                    minWidth: 'fit-content',
                  }}
                >
                  <AdminCard admin={admin} />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
